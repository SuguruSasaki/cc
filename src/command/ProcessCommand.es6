import { namespace } from '../namespace.es6';
import { Delegate } from '../utils/Delegate.es6';
import { Command } from './Command.es6';


export class ProcessCommand extends Command{


    constructor(scope, method){
        super(scope, method);
        this.commands = [];
    }


    dispose(){
        this.commands = null;
    }


    execute(){
        if(this.commands.length == 0) throw new Error("Commandが登録されていません。");
        var command = this.commands.shift();
        command.addEventListener(Event.COMPLETE, Delegate.create(this, this.__onCompleteListener__));
        command.execute();
    }


    addCommand(command){
        this.commands.push(command);
    }






    __onCompleteListener__(){
        if(this.commands.length > 0) {
            this.execute();
        }else {
            //super.execute();
        }
    }

}

namespace("ProcessCommand", ProcessCommand);