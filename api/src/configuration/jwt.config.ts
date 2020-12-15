import { registerAs } from '@nestjs/config';

export const JwtConfig = registerAs('jwt', () => ({
    secret: process.env.JWT_SECRET || 'b4c5bc677e7cc8b75fcc142f8823bc45d3ee',
    signOptions: {
        expiresIn: '3600s'
    },
}));
