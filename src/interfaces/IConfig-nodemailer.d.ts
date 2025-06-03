interface IConfigNodemailer {
    host:string;
    port: number;
    secure: boolean;
    auth: {
        user:string | undefined;
        pass:string | undefined;
    },
    tls: {
        rejectUnauthorized:boolean;
    };
}

export type {
    IConfigNodemailer,
}