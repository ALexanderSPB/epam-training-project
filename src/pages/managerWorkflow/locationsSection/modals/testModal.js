import React from 'react';
import EditRoomModal from './editRoom';

const rooms = [{name: 'jfh', capacity: '30'}, {name: 'ee', capacity: '3'}, {name: 'pok', capacity: '70'}];

const TestModal = () => {
    return(
        <ul>
            {rooms.map((room, index) => <li key={index}>{room.name}<EditRoomModal room={room} reference='ref'/></li>)}
        </ul>
    );
};

export default TestModal;
