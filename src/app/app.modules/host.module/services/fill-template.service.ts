type TemplateModel = Record<string, any>;

export class FillTemplateService
{
    private template: string;

    constructor(template: string)
    {
        this.template = template;
    }

    render(model: TemplateModel): string
    {
        // Process `repeat` blocks first
        const repeatProcessed = this.processRepeats(this.template, model);

        // Process `if` blocks
        const ifProcessed = this.processConditionals(repeatProcessed, model);

        // Replace variables
        return this.replaceVariables(ifProcessed, model);
    }

    private processRepeats(template: string, model: TemplateModel): string
    {
        return template.replace(/\{\{repeat (\w+)\}\}([\s\S]*?)\{\{\/repeat\}\}/g, (_, collectionKey, content) =>
        {
            const collection = model[collectionKey];
            if (!Array.isArray(collection))
            {
                return ''; // If the collection is not an array, return an empty string
            }

            // Render the content for each item in the collection
            return collection
                .map(item => new FillTemplateService(content).render(item))
                .join('');
        });
    }

    private processConditionals(template: string, model: TemplateModel): string
    {
        return template.replace(/\{\{if (\w+)\}\}([\s\S]*?)\{\{\/if\}\}/g, (_, conditionKey, content) =>
        {
            const condition = model[conditionKey];
            return condition ? content : ''; // Render content only if the condition is truthy
        });
    }

    private replaceVariables(template: string, model: TemplateModel): string
    {
        return template.replace(/\{\{(\w+)\}\}/g, (_, variable) =>
        {
            return model[variable] ?? ''; // Replace variables with their values from the model
        });
    }
}


// Example usage
// const template = `
//   {{if isVisible}}Visible text!{{/if}}
//   {{repeat items}}
//     <div>{{name}}</div>
//   {{/repeat}}
//   Hello, {{username}}!
// `;

// const model = {
//   isVisible: true,
//   username: 'John',
//   items: [{ name: 'Item 1' }, { name: 'Item 2' }, { name: 'Item 3' }],
// };

// const engine = new TemplateEngine(template);
// console.log(engine.render(model));
