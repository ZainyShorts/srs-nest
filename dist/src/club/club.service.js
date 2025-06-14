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
exports.ClubService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const club_schema_1 = require("./schema/club.schema");
let ClubService = class ClubService {
    constructor(clubModel) {
        this.clubModel = clubModel;
    }
    async create(createClubDto) {
        return this.clubModel.create(createClubDto);
    }
    async findAll() {
        return this.clubModel.find().exec();
    }
    async findOne(id) {
        const club = await this.clubModel.findById(id);
        if (!club) {
            throw new common_1.NotFoundException('Club not found');
        }
        return club;
    }
    async update(id, updateClubDto) {
        const updatedClub = await this.clubModel.findByIdAndUpdate(id, updateClubDto, { new: true });
        if (!updatedClub) {
            throw new common_1.NotFoundException('Club not found');
        }
        return updatedClub;
    }
    async remove(id) {
        const deletedClub = await this.clubModel.findByIdAndDelete(id);
        if (!deletedClub) {
            throw new common_1.NotFoundException('Club not found');
        }
        return { message: 'Club deleted successfully' };
    }
};
exports.ClubService = ClubService;
exports.ClubService = ClubService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(club_schema_1.Club.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], ClubService);
//# sourceMappingURL=club.service.js.map