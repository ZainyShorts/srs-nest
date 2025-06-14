"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActivityService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const schema_activity_1 = require("./schema/schema.activity");
let ActivityService = class ActivityService {
    constructor(activityModel) {
        this.activityModel = activityModel;
    }
    async create(createActivityDto) {
        const activity = new this.activityModel(createActivityDto);
        return activity.save();
    }
    async findAll(page = 1, limit = 10, title, performBy = 'Admin') {
        limit = limit > 0 ? limit : 10;
        const filter = {};
        if (title)
            filter.title = { $regex: title, $options: 'i' };
        if (performBy)
            filter.performBy = performBy;
        const totalRecords = await this.activityModel.countDocuments(filter);
        const totalPages = Math.ceil(totalRecords / limit);
        const data = await this.activityModel
            .find(filter)
            .sort({ createdAt: -1 })
            .limit(limit)
            .exec();
        return {
            totalRecords,
            totalPages,
            currentPage: page,
            currentLimit: limit,
            data,
        };
    }
    async findOne(id) {
        return this.activityModel.findById(id).exec();
    }
    async delete(id) {
        return this.activityModel.findByIdAndDelete(id).exec();
    }
};
exports.ActivityService = ActivityService;
exports.ActivityService = ActivityService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(schema_activity_1.Activity.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], ActivityService);
//# sourceMappingURL=activity.service.js.map