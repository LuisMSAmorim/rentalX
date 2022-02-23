

interface IEMailProvider {
    sendEmail(to: string, subject, body: string): Promise<void>;
};

export { IEMailProvider };