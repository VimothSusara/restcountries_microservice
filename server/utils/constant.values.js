const maximum_api_keys = 5; // Maximum number of API keys allowed per user
const api_key_expiry = 30; // API key expiry in days
const api_key_label_length = 50; // Maximum length of the API key label
const salt_rounds = 10; // Number of rounds for hashing the API key

module.exports = {
    maximum_api_keys,
    api_key_expiry,
    api_key_label_length,
    salt_rounds,
}