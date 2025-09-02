/**
 * Represents an event emitted from a Game instance to the Orchestrator.
 * This class standardizes the data structure for all game state changes that the
 * Orchestrator needs to be aware of.
 * The Game instance then first propagates the event to it's room instance
 * which will enrich the message with the roomId and propagate it to the
 * Orchestrator for handling
 */
export default class GameToOrchestratorCommand {
    /**
     * @param {string} eventType The type of event that occurred (from GAME_EVENTS).
     * @param {*} payload The data associated with the event.
     * @param {string|null} clientId The UUID of a specific client related to the event.
     */
    constructor(eventType, payload, clientId = null) {
        this.eventType = eventType;
        this.payload = payload;
        this.clientId = clientId;
    }
}
