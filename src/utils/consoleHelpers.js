const logger = require("../loaders/logger")

exports.welcomeMessage = () => {
    logger.info(
        "Running API...\n" +
        "░█████╗░██████╗░██╗\n" +
        "██╔══██╗██╔══██╗██║\n" +
        "███████║██████╔╝██║\n" +
        "██╔══██║██╔═══╝░██║\n" +
        "██║░░██║██║░░░░░██║\n" +
        "╚═╝░░╚═╝╚═╝░░░░░╚═╝")
}