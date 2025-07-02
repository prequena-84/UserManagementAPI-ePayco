import type { THost,TPort,Tsecure,TUser,TPass,TRejectUnauthorized } from "src/typescript/types/email/email.types";

interface IConfigNodeMailer {
    host:THost | undefined;
    port: TPort  | undefined;
    secure: Tsecure  | undefined;
    auth: {
        user:TUser | undefined;
        pass:TPass | undefined;
    };
    tls: {
        rejectUnauthorized:TRejectUnauthorized  | undefined;
    };
}

export type {
    IConfigNodeMailer,
}