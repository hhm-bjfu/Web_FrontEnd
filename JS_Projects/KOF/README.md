# RE 

主类

```js
import { GameMap } from "./game_map/base.js";
import { Player } from "./player/base.js";


class KOF {
    constructor(id) {
        this.$kof = $('#' + id); // 将id = kof的div和KOF类绑定
        // this.$kof.on('click', function (e) {
        //     console.log("hell");
        // });

        this.game_map = new GameMap(this);

        this.players = [
            new Player(this, {
                id: 0,
                x: 200,
                y: 0, 
                width: 120,
                height: 200,
                color: 'blue',
            }),

            new Player(this, {
                id:1,
                x: 900,
                y: 0, 
                width: 120,
                height: 200,
                color: 'red',
            }),
        ];

    }

}

export {
    KOF
}
```





地图

```js
import { AcGameObject } from "../ac_game_object/base.js"

class GameMap extends AcGameObject{
    constructor(root) {
        super();

        this.root = root;
        this.$canvas = $('<canvas width="1280" height="720" tabindex=0></canvas>');
        this.ctx = this.$canvas[0].getContext('2d');
        this.root.$kof.append(this.$canvas);
        this.$canvas.focus();

        this.$canvas.on("click", () => {
            console.log("click the area");
        });
    }
    
    start () {
        
    }

    update () {
        this.render();
    }

    render () {
        // this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);

        this.ctx.fillStyle = 'black';
        this.ctx.fillRect(0, 0, this.$canvas.width(), this.$canvas.height());


    }
}
 
export {
    GameMap
}
```

