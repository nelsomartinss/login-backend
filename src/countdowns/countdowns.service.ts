// logica de negocio fica no service
// recebe os dados do controller, acessa o banco via model e mongoose, cria, lista e remove os contadodores

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';

import { Countdown } from './countdown.schema';
import { CreateCountdownDto } from './dto/create-countdown.dto';
import { UpdateCountdownDto } from './dto/update-countdown.dto';
import { count } from 'console';

@Injectable()
export class CountdownsService {
    constructor(
        @InjectModel(Countdown.name)
        private countdownModel: Model<Countdown>,
    ) { }

    // Criar countdown
    async create(dto: CreateCountdownDto, userId: string) {
        const startAt = dto.startAt ? new Date(dto.startAt) : new Date();

        const countdown = new this.countdownModel({
            title: dto.title,
            userId,
            startAt,
        })

        return countdown.save();
    }

    async findAllByUser(userId: string) {
        return this.countdownModel.find({ userId });
    }

    async findOne(id: string, userId: string) {
        const countdown = await this.countdownModel.findOne({
            _id: id,
            userId,
        });

        if (!countdown) {
            throw new NotFoundException('Countdown não encontrado');
        }

        return countdown;
    }


    // Atualizar countdown
    async update(id: string, dto: UpdateCountdownDto, userId: string) {
        const countdown = await this.findOne(id, userId);

        if (dto.title) {
            countdown.title = dto.title;
        }

        if (dto.startAt) {
            countdown.startAt = new Date(dto.startAt);
        }

        return countdown.save();
    }

    // Deletar countdown
    async remove(id: string, userId: string) {
        const deleted = await this.countdownModel.findByIdAndDelete({
            _id: id,
            userId,
        })

        if (!deleted) {
            throw new NotFoundException(`Countdown não encontrado.`)
        }

        return { message: 'Countdown removido.' };
    }
}
