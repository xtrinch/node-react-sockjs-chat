// using named parameters and default values in ES6
function Message ({ text='', type, username, connection_id, data } = {}) {
    this.type = type;
    this.text = text;
    this.username = username;
    this.data = data;
    this.connection_id = connection_id;
    this.id = Math.random().toString(36).substring(7);
    this.created_at = new Date();
}

function User ({ username, connection_id } = {}) {
    this.username = username;
    this.connection_id = connection_id;
    this.id = Math.random().toString(36).substring(7);
}

module.exports = {
    User: User,
    Message: Message
}
