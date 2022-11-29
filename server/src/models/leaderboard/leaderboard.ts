import mongoose from 'mongoose';
import { ILeaderboard } from '../../types/models/leaderboard.types';

// Schema options to include id field & add timestamps while creation and updation.
const schemaOptions = {
    timestamps: {
        createdAt: 'createdDate',
        updatedAt: 'lastModifiedDate'
    },
    toJSON: {
        virtuals: true
    },
    toObject: {
        virtuals: true
    }
};

// User Schema
const schema = new mongoose.Schema<ILeaderboard>({
    gameId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    score: {
        type: Number,
        required: true,
        trim: true,
    },
}, schemaOptions);

/**
 * @typedef Leaderboard
 */
export const Leaderboard = mongoose.model<ILeaderboard>('Leaderboard', schema);