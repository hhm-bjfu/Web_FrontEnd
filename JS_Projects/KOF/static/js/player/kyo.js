import { Player } from "../player/base.js";
import { GIF } from "../utils/gif.js";
import { AcGameObject } from "../ac_game_object/base.js";

export class Kyo extends Player {
    constructor(root, info) {
        super(root, info);

        this.init_animations();
    }

    init_animations () {
        let outer = this;
        let offsets = [0, -22, -22, -140, 0, 0, 0]
        for (let i = 0; i < 7; i++) {
            let gif = GIF();
            gif.load(`/static/images/players/kyo/${i}.gif`);
            

            this.animations.set(i, {
                gif: gif,
                frame_cnt: 0, // 当前动画的总图片数
                frame_rate: 5, // 每5帧渲染下一张图片
                offset_y: offsets[i], // y方向的偏移量,不同动画高度是不一样的，因此加上偏移量来调节视觉效果
                loaded: false, // 是否加载完全
                scale:2,  // 放大多少倍
            }); // 每一个gif图有许多张图片，占用很多帧

            gif.onload = function () {
                let obj = outer.animations.get(i);
                obj.frame_cnt = gif.frames.length; // 这里的gif类可以获取每个gif图片含的图片数量
                obj.loaded = true;

                if (i === 3) { // 当处于跳跃时，每5帧播放一张图慢了，这里特判加快
                    obj.frame_rate = 4;
                }
            }
        }
    }
}