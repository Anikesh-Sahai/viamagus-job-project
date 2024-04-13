import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { TeamService } from './team.service';
import { Team } from './schemas/team.schema';
import mongoose from 'mongoose';

@Controller('team')
export class TeamController {
  constructor(private teamService: TeamService) {}

  @Post()
  async createTeam(
    @Body()
    team,
  ): Promise<Team> {
    return this.teamService.createTeam(team);
  }

  @Get(':id')
  async getTask(
    @Param('id')
    id: string,
  ): Promise<Team> {
    const isValidId = mongoose.isValidObjectId(id);

    if (!isValidId) {
      throw new BadRequestException('please enter valid id');
    }

    return this.teamService.getTeam(id);
  }

  @Put(':id')
  async updateTask(
    @Param('id')
    id: string,
    @Body()
    team,
  ): Promise<Team> {
    const isValidId = mongoose.isValidObjectId(id);

    if (!isValidId) {
      throw new BadRequestException('please enter valid id');
    }
    return this.teamService.UpdateTeamkById(id, team);
  }
}
