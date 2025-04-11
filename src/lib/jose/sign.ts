import { JWTPayload, SignJWT, jwtVerify } from 'jose';
import { getJWTSecret } from '../helpers';

// Sign a payload:

type Param = {
    secret:string;
    expireIn?:number | string | Date
}

export async function signJwt<T extends JWTPayload>(payload: T,options:Param) {
    return await new SignJWT(payload)
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        .setExpirationTime(options.expireIn??'1d')
        .sign(getJWTSecret(options.secret!));
}

// Verify a JWT:
export async function verifyToken(token: string) {
    const { payload } = await jwtVerify(
        token,
        new TextEncoder().encode(process.env.JWT_SECRET)
    );
    return payload;
}
