
import Settings from '../settings/Settings.js';
import Workspace from '../workspace/Workspace.js';
class Dashboard{
    constructor(id,width,height,bgColor){
        this.id = id;
        this.parentELement = document.getElementsByClassName(`garage-band-container`)[0];
        this.width = width;
        this.height = height;    
        this.backgroundColor = bgColor;
        this.settingsWidth = 30;
        this.workspaceWidth = 70;
        this.render();
        this.renderChild();
    }

    render(){
        this.parentELement.classList.add('clearfix');
        this.parentELement.style.width = `${this.width}em`;
        this.parentELement.style.height = `${this.height}vh`;
        this.parentELement.style.backgroundColor = `${this.backgroundColor}`;   
        this.parentELement.style.margin = 'auto';   

    }
    renderChild(){
        const settings = new Settings(this.id,this.parentELement,this.settingsWidth, this.height,'white');
        this.workspaceInstance = new Workspace(this.id,this.parentELement,this.workspaceWidth, this.height,'grey');

    }

    DashboardProps(){
        return this.workspaceInstance
    }

}
export default Dashboard;