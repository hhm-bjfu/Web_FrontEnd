let AC_GAME_OBJECTS = [];

export class AcGameObject {
    constructor() {
        AC_GAME_OBJECTS.push(this); // 加入需要每秒刷新60次的对象队列中

        let timedelta = 0; // 此帧与上帧的时间间隔

        let has_call_start = false; // 初始函数是否被运行过
    }

    start () {

    }

    update () {
        
    }

    destroy () {
        for (let i in AC_GAME_OBJECTS) {
            if (AC_GAME_OBJECTS[i] === this) {
                AC_GAME_OBJECTS.splice(i, 1);
                break;
            }
        }
    }
}

let last_timestamp; // 上一帧的时间戳

let AC_GAME_OBJECTS_FRAME = ((timestamp) => {
    for (let obj of AC_GAME_OBJECTS) {
        if (!obj.has_call_start) { // 对于某对象，若本帧没有开始 ，则执行开始函数
            obj.start();
            obj.has_call_start = true;
        } else { // 对于本对象，若本帧开始了，则执行update函数
            obj.timedelta = timestamp - last_timestamp;
            obj.update();
        }
    }

    
    last_timestamp = timestamp;
    requestAnimationFrame(AC_GAME_OBJECTS_FRAME); // 会附带一个时间戳参数
});

requestAnimationFrame(AC_GAME_OBJECTS_FRAME);