import {Response, StaticRequestEvent, StaticRequestEventListener} from '@byteshift/harmony';
import {Service}                                                  from '@byteshift/injector';
import * as fs                                                    from 'fs';
import * as path                                                  from 'path';
import {ModuleKind, ScriptTarget, transpile}                      from 'typescript';

@Service
export class TypescriptCompiler implements StaticRequestEventListener
{
    public priority: number = 1;

    public async callback(event: StaticRequestEvent): Promise<void>
    {
        if (false === event.fileName.endsWith('.ts')) {
            return;
        }

        try {
            const result = transpile(fs.readFileSync(event.fileName).toString(), {
                allowJs: true,
                checkJs: false,
                target:  ScriptTarget.ESNext,
                module:  ModuleKind.ES2020,
            });

            // Rewrite import statements.
            const lines = result.split(/[\r\n]/g);
            const src   = [];

            for (let line of lines) {
                const imports = /^import\s+(.+)\s+from\s+['"](.+)['"];$/gmi.exec(line);
                if (!imports) {
                    src.push(line);
                    continue;
                }

                if (imports[2] && (imports[2].charAt(0) === '.' || imports[2].charAt(0) === '/')) {
                    const fileName = path.resolve(path.dirname(event.fileName), imports[2]);
                    if (!fs.existsSync(fileName)) {
                        line = line.replace(imports[2], imports[2] + '.ts');
                    }
                }

                src.push(line);
            }

            event.setResponse(new Response(src.join("\n"), 200, 'text/javascript'));
        } catch (e) {
            event.setResponse(new Response(`console.error(${JSON.stringify(e.message)})`, 500, 'text/javascript'));
        }
    }
}
