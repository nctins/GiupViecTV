class SocketService {
    connection(socket) {
        socket.on("disconnect", ()=>{
            console.log(`${socket.id} is disconnect`)
        });

        // other event
    }
}

export default new SocketService();