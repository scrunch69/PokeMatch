import { Server } from "socket.io";
import { EVENTS } from "../../../shared/constants.js";
import logger from "../utils/Logger.js";

/**
 * SocketService
 * -------------
 * Manages all Socket.IO communication between the server and clients.
 *
 * Responsibilities:
 * - Initializes the Socket.IO server with CORS and UUID authentication.
 * - Registers event listeners for client connections and game-related actions.
 * - Delegates incoming events to the Orchestrator for business logic.
 * - Provides methods to emit server-to-client events (room updates, errors, etc.).
 *
 * Usage:
 *   const socketService = new SocketService(server, orchestrator);
 *   socketService.init();
 *
 * Key Methods:
 * - init(): Sets up middleware and event listeners for all relevant socket events.
 * - emitUpdate(socket, data): Sends the latest room/game state to a client.
 * - emitRoomFull(socket): Notifies a client that a room is full.
 * - emitRoomCrash(socket): Notifies a client that their room has crashed.
 * - emitNameError(socket): Notifies a client of a name validation error.
 * - emitActionError(socket, reason): Notifies a client of an invalid game action.
 */
export default class SocketService {
    constructor(server, orchestrator) {
        this.orchestrator = orchestrator;
        this.io = new Server(server, {
            cors: {
                origin: "*",
                methods: ["GET", "POST"],
                credentials: true,
            },
        });
    }

    /**
     * Initializes the Socket.IO server:
     * - Adds UUID authentication middleware.
     * - Registers all event listeners for client actions.
     */
    init() {
        this.io.use((socket, next) => {
            const uuid = socket.handshake.auth.uuid;
            if (!uuid) {
                logger.warn(
                    `[SocketService] No UUID found for socket: ${socket.id}`
                );
                return next(new Error("No UUID found"));
            }
            next();
        });

        this.io.on("connection", (socket) => {
            this.orchestrator.onConnection(socket);

            socket.on("disconnect", () => {
                this.orchestrator.onDisconnect(socket);
            });

            socket.on(EVENTS.NAME_ENTER, (payload) => {
                this.orchestrator.onNameEnter(socket, payload);
            });

            socket.on(EVENTS.READY, () => {
                this.orchestrator.onReady(socket);
            });

            socket.on(EVENTS.LEAVE_ROOM, () => {
                this.orchestrator.onLeaveRoom(socket);
            });

            socket.on(EVENTS.GAME_COMMAND, (data) => {
                this.orchestrator.onGameCommand(socket, data);
            });
        });
    }

    // Emits the latest room/game state to a client.
    emitUpdate(socket, data) {
        socket.emit(EVENTS.UPDATE, data);
    }

    // Notifies a client that a room is full.
    emitRoomFull(socket) {
        socket.emit(EVENTS.ROOM_FULL);
    }

    // Notifies a client that their room has crashed.
    emitRoomCrash(socket) {
        socket.emit(EVENTS.ROOM_CRASH);
    }

    // Notifies a client of a name validation error.
    emitNameError(socket) {
        socket.emit(EVENTS.NAME_ERROR);
    }

    // Notifies a client of an invalid select stat action.
    emitActionError(socket, reason = null) {
        socket.emit(EVENTS.SELECT_STAT_ERROR, { reason });
    }
}
