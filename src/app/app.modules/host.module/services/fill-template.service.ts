type TemplateModel = Record<string, any>;

class FillTemplateService
{
    private template: string;

    constructor(template: string)
    {
        this.template = template;
    }

    render(model: TemplateModel): string
    {
        return this.template.replace(/\{\{(.*?)\}\}/g, (_, key) =>
        {
            const parts = key.trim().split(' ');
            const command = parts[0];
            const args = parts.slice(1);

            switch (command)
            {
                case 'if': {
                    const [conditionKey] = args;
                    return model[conditionKey] ? '' : '{{hidden}}';
                }
                case 'repeat': {
                    const [collectionKey, subTemplate] = args;
                    const collection = model[collectionKey];
                    if (Array.isArray(collection))
                    {
                        return collection
                            .map(item => new FillTemplateService(subTemplate).render(item))
                            .join('');
                    }
                    return '';
                }
                default: {
                    return model[key.trim()] ?? '';
                }
            }
        });
    }
}

// Przykładowe użycie
// const template = `
//   {{if isVisible}}Widoczny tekst{{/if}}
//   {{repeat items <div>{{name}}</div>}}
//   Witaj, {{username}}!
// `;

// const model = {
//     isVisible: true,
//     username: 'Jan',
//     items: [{ name: 'Element 1' }, { name: 'Element 2' }],
// };

// const engine = new TemplateEngine(template);
// console.log(engine.render(model));
