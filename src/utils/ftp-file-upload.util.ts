import Client from "ftp-ts";

export async function ftpFileUpload(host:string, port:number, user:string, password:string | undefined, filePath:string, remoteFileName:string): Promise<void>
{
    await Client.connect({host: host, port: port, user: user, password: password})
        .then(async (c): Promise<void> => 
        {
            let fimg = await fetch(filePath);
            let fimgb = Buffer.from(await fimg.arrayBuffer())
            c.put(fimgb, remoteFileName)
                .then(() => {
                    console.log(`Plik ${remoteFileName} został przesłany na FTP.`);
                })
                .catch((err) => {
                    console.error(`Błąd podczas przesyłania pliku na FTP: ${err}`);
                })
                .finally(() => {
                    c.end();
                });
        });
}