import { AcGameObject } from "../ac_game_object/base.js";


class Player extends AcGameObject {
    constructor(root, info) {
        super();

        this.root = root;

        this.id = info.id;
        this.x = info.x;
        this.y = info.y;
        this.width = info.width;
        this.height = info.height;
        this.color = info.color;

        this.direction = 1; // 初始方向向右

        this.status = 3; // 0: 待机 1:向右 2：向左 3：静止 4：攻击 5：被打 6：死亡 

        this.gravity = 50; // 重力

        this.vx = 0; // 水平和竖直方向速度
        this.vy = 0;
        this.speedx = 400; // 水平和竖直方向初始速度
        this.speedy = -1000;


        this.pressed_keys = this.root.game_map.controller.pressed_keys;

        this.ctx = this.root.game_map.ctx;


        this.animations = new Map(); // map存动画

        this.frame_current_cnt = 0; // 当前记录的总帧数


        this.hp = 100;
        this.$hp = this.root.$kof.find(`.kof-head-hp-${this.id}>div`);

        this.$hp_div = this.$hp.find("div");
    }

    start () {
        
    }

    update_move () {
        this.vy += this.gravity;  


        this.x += this.vx * this.timedelta / 1000;
        this.y += this.vy * this.timedelta / 1000;

        if (this.y > 450) {
            this.y = 450;
            this.vy = 0;
            if (this.status === 3) {
                this.status = 0; // 初始到地面之后变成待机状态
            }
        }

        if (this.x < 0) {
            this.x = 0;
        } else if (this.x + this.width > this.root.game_map.$canvas.width()) {
            this.x = this.root.game_map.$canvas.width() - this.width;
        }

        
    }

    update_control () {
        let w, d, a, space;
        if (this.id === 0) {
            w = this.pressed_keys.has('w');
            d = this.pressed_keys.has('d');
            a = this.pressed_keys.has('a');
            space = this.pressed_keys.has(' ');
        } else {
            w = this.pressed_keys.has('ArrowUp');
            d = this.pressed_keys.has('ArrowRight');
            a = this.pressed_keys.has('ArrowLeft');
            space = this.pressed_keys.has('Enter');    
        }

        


        if (this.status === 0 || this.status === 1) { // 待机或者走动
            if (space) {
                this.status = 4;
                this.vx = 0;
                this.frame_current_cnt = 0;
            } else if (w) { // 跳
                if (d) { // 向右跳
                    this.vx = this.speedx;
                } else if (a) { // 向左跳
                    this.vx = -this.speedx;
                } else {
                    this.vx = 0;
                }

                this.vy = this.speedy;
                this.status = 3;
                this.frame_current_cnt = 0; 
            } else if (d) { // 向右走
                this.vx = this.speedx;
                this.status = 1;
            } else if (a) { // 向左走
                this.vx = -this.speedx;
                this.status = 1;
            } else {
                this.vx = 0;
                this.status = 0;
            }
        }
    }

    update_direction () {
        if (this.status === 6) // 倒地之后不再变方向
            return;

        let players = this.root.players;
        if (players[0] && players[1]) {
            let me = this, you = players[1 - this.id];
            if (me.x < you.x) me.direction = 1;
            else me.direction = -1;

        }
    }

    is_attack () {
        if (this.status === 6)
            return;  

        // console.log("被攻击了");
        this.status = 5;
        this.frame_current_cnt = 0;  // 从第0帧开始渲染

        this.hp = Math.max(this.hp - 25, 0);

        this.$hp_div.animate({
            width:this.$hp.parent().width() * this.hp / 100
        }, 400);

        this.$hp.animate({
            width:this.$hp.parent().width() * this.hp / 100
        }, 700);
        

        if (this.hp <= 0) {
            this.status = 6;
            this.frame_current_cnt = 0;
        }
    }

    is_collision (r1, r2) { // 判断两个矩形有无交集
        console.log("判断有无交集");
        if (Math.max(r1.x1, r2.x1) > Math.min(r1.x2, r2.x2))
            return false;
        if (Math.max(r1.y1, r2.y1) > Math.min(r1.y2, r2.y2))
            return false;
        return true;
    }

    update_attack () {
        if (this.status === 4 && this.frame_current_cnt === 18) { // 处于攻击状态且处于拳头伸直
            let me = this, you = this.root.players[1 - this.id];
            let r1; // 第一种正常坐标
            if (this.direction > 0) {
                r1 = { // 渲染对象攻击矩形
                    x1: me.x + 120,
                    y1: me.y + 40,
                    x2: me.x + 120 + 100,
                    y2: me.y + 40 + 20,
                };
            } else {
                r1 = {
                    x1: me.x + me.width - 120 - 100,
                    y1: me.y + 40,
                    x2: me.x + me.width - 120 - 100 + 100,
                    y2: me.y + 40 + 20,
                };
            }

            let r2 = { // 对方的被攻击矩阵
                x1: you.x,
                y1: you.y,
                x2: you.x + you.width,
                y2: you.y + you.height,
            };

            if (this.is_collision(r1, r2)) {
                you.is_attack();
            }
        }
    }

    update () {
        this.update_control();
        this.update_move();
        this.update_direction();
        this.update_attack();
        

        this.render();
    }

    render () {
        // 攻击特效抽象
        // this.ctx.fillStyle = 'blue';
        // this.ctx.fillRect(this.x, this.y, this.width, this.height);

        // if (this.direction > 0) { // 该渲染对象是正方向
        //     this.ctx.fillStyle = 'red';
        //     this.ctx.fillRect(this.x + this.width, this.y + 40, 200 - this.width + 20, 20);
        // } else {
        //     this.ctx.fillStyle = 'red';
        //     this.ctx.fillRect(this.x - 200 + this.width - 20, this.y + 40, 200 - this.width + 20, 20);
        // }
        


        // this.root.game_map.ctx.fillStyle = this.color;
        // this.root.game_map.ctx.fillRect(this.x, this.y, this.width, this.height);

        let status = this.status;

        if (this.status === 1 && this.direction * this.vx < 0) { // 不同方向，表示后退
            status = 2;
        }

        let obj = this.animations.get(status);
        if (obj && obj.loaded) {
            if (this.direction > 0) {
                // 总帧数 / 某个速率，假设速率为5,则表示以前的5帧算一帧，然后模上每个gif图中包含的图片数
                // 相当于每一个图片都用了之前的5帧的时长，这样看起来就慢一些
                let k = parseInt(this.frame_current_cnt / obj.frame_rate)% obj.frame_cnt;
                let image = obj.gif.frames[k].image;
                this.ctx.drawImage(image, this.x, this.y + obj.offset_y, image.width * obj.scale, image.height * obj.scale);
            } else {

                // 旋转图片的本质是翻转坐标
                this.ctx.save(); // 保存配置

                this.ctx.scale(-1, 1);
                this.ctx.translate(-this.root.game_map.$canvas.width(), 0); // x轴平移

                // 总帧数 / 某个速率，假设速率为5,则表示以前的5帧算一帧，然后模上每个gif图中包含的图片数
                // 相当于每一个图片都用了之前的5帧的时长，这样看起来就慢一些
                let k = parseInt(this.frame_current_cnt / obj.frame_rate)% obj.frame_cnt;
                let image = obj.gif.frames[k].image;
                this.ctx.drawImage(image, this.root.game_map.$canvas.width() - this.width -  this.x, this.y + obj.offset_y, image.width * obj.scale, image.height * obj.scale);

                this.ctx.restore(); // restore回之前状态
            }



            
        }

        if (status === 4 || status === 5 || status === 6) {
            if (this.frame_current_cnt === obj.frame_rate * (obj.frame_cnt - 1)) {  // 播放到了最后一帧
                if (this.status === 6) {
                    this.frame_current_cnt--; // 抵消下一帧，一直处于倒地状态
                } else {
                    this.status = 0;
                }
            }

        }

        this.frame_current_cnt++; 
    }
}

export {
    Player
}