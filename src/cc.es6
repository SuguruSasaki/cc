import { namespace_global } from './namespace.es6';
import { C2App } from './app/C2App.es6';
import { Command } from './command/Command.es6';
import { AsyncCommand } from './command/AsyncCommand.es6';
import { ProcessCommand } from './command/ProcessCommand.es6';
import { Loader } from './net/Loader.es6';


export class C2 {

    /**
     * Create C2App instance
     * @param stageID
     * @returns {C2App|*}
     */
    static createApp(stageID){
        return new CC.C2App(stageID);
    }

}

namespace_global("C2", C2);