const { selection } = require("scenegraph")
let panel;

function create() {
    const HTML =
        `<style>
            .break {
                flex-wrap: wrap;
            }
            label.row > span {
                color: #8E8E8E;
                width: 20px;
                text-align: right;
                font-size: 9px;
            }
            label.row input {
                flex: 1 1 auto;
            }
            .show {
                display: block;
            }
            .hide {
                display: none;
            }
        </style>
        <form method="dialog" id="main">
        <h1>Enter the height, width and colour you want to fill</h1>
            <div class="row break">
                <label class="row">
                    <input type="number"  id="txtV"  placeholder="Height" />
                </label>
                <label class="row">
                    <input type="number"  id="txtH"  placeholder="Width" />
                </label>
                <label class="row">
                    <input type="color" id="clr" value="#FFFFFF" placeholder="Hex code" />
                </label>
            </div>
    
            <button id="ok" type="submit" uxp-variant="cta" align="left">Apply</button>
        </form>
        <p id="warning">This plugin requires you to select a rectangle in the document. Please select a rectangle.</p>
        `
    function updateRectangleSize() {
        const { editDocument } = require("application");
        const Color = require("scenegraph").Color;
        const height = Number(document.querySelector("#txtV").value);
        const width = Number(document.querySelector("#txtH").value);
        const colr = new Color(document.getElementById("clr").value);


        editDocument({ editLabel: "Update rectangle size" }, function (selection) {
            const selectedRectangle = selection.items[0];
            if(width !== 0){
                selectedRectangle.width = width
            }
            if(height !== 0){
                selectedRectangle.height = height
            }
            
            selectedRectangle.fill = colr;
        })
    }

    panel = document.createElement("div");
    panel.innerHTML = HTML;
    panel.querySelector("form").addEventListener("submit", updateRectangleSize);

    return panel;
}

function show(event) {
    if (!panel) event.node.appendChild(create());
}

function update() {
    const { Rectangle } = require("scenegraph");
    let form = document.querySelector("form");
    let warning = document.querySelector("#warning");
    if (!selection || !(selection.items[0] instanceof Rectangle)) {
        form.className = "hide";
        warning.className = "show";
    } else {
        form.className = "show";
        warning.className = "hide";
    }
}


module.exports = {
    panels: {
        updateLayout: {
            show,
            update
        }
    }
};
