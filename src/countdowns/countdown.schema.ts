import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"; // decorar e construir um schema
import { HydratedDocument, Types } from "mongoose"; // tipos fornecidos pelo mongoose

// tipo typescript personaoidado
export type CountdownDocument = HydratedDocument<Countdown>; // tipo que representa um doc da coleção coutndown

@Schema({ timestamps: true })
export class Countdown {
    // referencia ao usuario que criou o contador
    @Prop({ type: String, required: true })
    userId: string;

    // isso é o título do contador
    @Prop({ type: String, required: true, trim: true })
    title: string;

    // Isso é a data de início. Algo que se não for gerador o service vai definir como new Date()
    @Prop({ type: Date, required: true })
    startAt: Date;
}

export const CountdownSchema = SchemaFactory.createForClass(Countdown); // reconhece os decoradores @Schema() e Prop() e gera o campo contdownSchema