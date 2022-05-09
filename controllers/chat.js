// Import Models
const ProfileDokter = require('../models/profileDokter');
const User = require('../models/user');
const Message = require('../models/messages');
const Room = require('../models/rooms');

module.exports.index = async(req, res) => {
    const userId = req.user._id;
    const user = await User.findById(userId);
    const allDokter = await ProfileDokter.find({});
    res.render('chat/index', {allDokter, user});
}

module.exports.newChat = async(req, res) => {
    let room = req.body.room;
    let name = req.body.name;
    const findRoom = await Room.findOne({name: name});
    if(findRoom) {
        let checkName = 1;
        for(let findName of findRoom.name){
            if(findName == name){
                checkName = 0;
                break;
            }
        }
        if(checkName === 1) {
            if(findRoom.name.length < 2){
                findRoom.name.push(name);
                findRoom.save();
            }
        }
    } else if(!findRoom) {
        const tempRoom = new Room({room , name});
        room = JSON.stringify(tempRoom._id);
        room = room.replace('"', '');
        room = room.replace('"', '');
        let roomId = tempRoom._id;
        const newRoom = new Room({_id: roomId, room , name});
        newRoom.save();
    }
    res.redirect('/chat/rooms');
}

module.exports.roomsPage = async(req, res) => {
    const userId = req.user._id;
    const user = await User.findById(userId);
    const findAllRoom = await Room.find({name: user.username});
    const allDokter = await ProfileDokter.find({});
    res.render('chat/rooms', {findAllRoom, user, allDokter});
}

module.exports.searchRooms = async(req, res) => {
    const userId = req.user._id;
    const user = await User.findById(userId);
    const findAllRoom = await Room.find({name: user.username});
    const inputDokter = new ProfileDokter(req.body);
    const tempDokter = inputDokter.nama.toUpperCase();
    const allDokter = await ProfileDokter.find({nama: {$regex: tempDokter}});
    res.render('chat/rooms', {findAllRoom, user, allDokter});
}

module.exports.chatPage = async(req, res) => {
    let tempName = '';
    const userId = req.user._id;
    const user = await User.findById(userId);
    const allDokter = await ProfileDokter.find({});
    const {roomId} = req.params;
    const findRoom = await Room.findOne({_id: roomId});
    for(let name of findRoom.name){
        if(name != user.username){
            tempName = name;
        }
    }
    const findMessages = await Message.find({room: roomId});
    res.render('chat/chat', {user, findRoom, allDokter, findMessages, tempName});
}

module.exports.sendMessage = async(req, res) => {
    const {roomId} = req.params;
    const {message} = req.body;
    const userId = req.user._id;
    const user = await User.findById(userId);
    const tempName = user.username;

    const time = new Date().toLocaleString("id-ID");
    const newMessage = new Message({room: roomId, name: tempName, message, time});
    newMessage.save();
    res.redirect(`/chat/rooms/${roomId}`);
}

module.exports.searchDokter = async(req, res) => {
    const inputDokter = new ProfileDokter(req.body);
    const tempDokter = inputDokter.nama.toUpperCase();
    const allDokter = await ProfileDokter.find({nama: {$regex: tempDokter}});
    res.render('chat/index', {allDokter});
}