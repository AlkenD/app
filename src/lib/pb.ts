import PocketBase from 'pocketbase';
import { PUBLIC_SERVER } from '$env/static/public';

const pb = new PocketBase(PUBLIC_SERVER);
pb.autoCancellation(false);

export default pb;
