import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Team } from './schemas/team.schema';
import mongoose from 'mongoose';

@Injectable()
export class TeamService {
  constructor(
    @InjectModel(Team.name)
    private teamModel: mongoose.Model<Team>,
  ) {}

  async createTeam(team: Team): Promise<Team> {
    return this.teamModel.create(team);
  }

  async getTeam(id: string): Promise<Team> {
    return this.teamModel.findById(id);
  }

  async UpdateTeamkById(id: string, team: Team): Promise<Team> {
    return await this.teamModel.findByIdAndUpdate(id, team, {
      new: true,
      runValidators: true,
    });
  }
}
