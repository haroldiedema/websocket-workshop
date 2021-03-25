import {Response, StaticRequestEvent, StaticRequestEventListener} from '@byteshift/harmony';
import {Service}                                                  from '@byteshift/injector';
import * as path                                                  from 'path';
import {renderSync}                                               from 'sass';

@Service
export class SassCompiler implements StaticRequestEventListener
{
    public priority: number = 1;

    public async callback(event: StaticRequestEvent): Promise<void>
    {
        if (false === event.fileName.endsWith('.scss')) {
            return;
        }

        const result = renderSync({
            file: event.fileName,
            includePaths: [path.resolve(path.dirname(event.fileName))]
        });

        event.setResponse(new Response(result.css, 200, 'text/css'));
    }
}
