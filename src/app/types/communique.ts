export default interface Communique{
    id: number;
    title: string;
    slug: string;
    createdAt: Date;
    visible: boolean;
    image: string;
    content: string;
}