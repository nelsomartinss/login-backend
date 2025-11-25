// logica de negocio fica no service
// recebe os dados do controller, acessa o banco via model e mongoose, cria, lista e remove os contadodores

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Countdown } from './countdown.schema';
import { CreateCountdownDto } from './dto/create.countdow.dto';
import { UpdateCountdownDto } from './dto/update-countdown.dto';

@Injectable()
export class CountdownsService {
    constructor(
        @InjectModel(Countdown.name)
        private countdownModel: Model<Countdown>,
    ) { }

    // Criar countdown
    async create(createDto: CreateCountdownDto) {
        const created = new this.countdownModel({
            ...createDto,
            startAt: new Date();
        })

        return created.save();
    }

    // Listar todos
    async findAll() {
        return this.countdownModel.find().exec();
    }

    // Buscar por ID
    async findOne(id: string) {
        const countdown = await this.countdownModel.findById(id).exec();

        if (!countdown) {
            throw new NotFoundException('Contador não encontrado!');
        }

        return countdown;
    }

    // Atualizar countdown
    async update(id: string, updateDto: UpdateCountdownDto) {
        const updated = await this.countdownModel
            .findByIdAndUpdate(id, updateDto, { new: true })
            .exec();

        if(!updated){
            throw new NotFoundException(`Countdown ${id} não encontrado!`)
        }
    }
}
