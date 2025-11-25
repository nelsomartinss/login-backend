// define como um countdown é armazenado no mongodb
// armezena o dono, o titulo do contador, registra quand ele começou e cria o createdAt e updatedAt automaticamente

import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"; // decorar e construir um schema
import { HydratedDocument, Types } from "mongoose"; // tipos fornecidos pelo mongoose

// tipo typescript personaoidado
export type CountdownDocument = HydratedDocument<Countdown>; // tipo que representa um doc da coleção coutndown

@Schema({ timestamps: true })
export class Countdown {
    // referencia ao usuario que criou o contador
    @Prop({ type: Types.ObjectId, required: true })
    userId: Types.ObjectId;

    // isso é o título do contador
    @Prop({ required: true })
    title: string;

    // Isso é a data de início. Algo que se não for gerador o service vai definir como new Date()
    @Prop({ type: Date, required: true })
    startAt: Date;
}

export const CountdownSchema = SchemaFactory.createForClass(Countdown); // reconhece os decoradores @Schema() e Prop() e gera o campo contdownSchema