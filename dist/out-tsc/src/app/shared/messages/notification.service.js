import { EventEmitter } from '@angular/core';
var NotificationService = /** @class */ (function () {
    function NotificationService() {
        this.notifier = new EventEmitter();
    }
    NotificationService.prototype.notify = function (message) {
        this.notifier.emit(message);
    };
    ;
    return NotificationService;
}());
export { NotificationService };
;
//# sourceMappingURL=notification.service.js.map