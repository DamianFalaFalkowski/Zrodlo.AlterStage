export default function thisLine(e: Error):string {
   const regex = /\((.*):(\d+):(\d+)\)$/
   const match = regex.exec(e.stack!.split("\n")[2]);
   const obj = {
      filepath: match?.at(1),
      line: match?.at(2),
      column: match?.at(3)
   }
   return  `${obj.filepath} --> ln.${obj.line} cl.${obj.column}`;
 }