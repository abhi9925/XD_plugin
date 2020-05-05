const commands = require("commands");

function updateLayout2(selection) {
    // console.log(selection.items);
        
    if(selection.items.length !== 0){

        selection.items.forEach((element) => {
            element.width = 300;
            element.height = 100;
            
        });

    }
}

module.exports = {
  commands: {
    updateLayout2
  }
};

