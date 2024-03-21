import crypto from 'crypto'

const generateUniqueToken = () => {
    const buffer = crypto.randomBytes(16);
    const token = buffer.toString('hex');
    const timestamp = Date.now();
    const uniqueToken = token + timestamp;
    return uniqueToken;
}

export default generateUniqueToken();