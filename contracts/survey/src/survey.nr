contract Survey {
    // docs:start:imports
    use dep::aztec::prelude::{AztecAddress, FunctionSelector, PrivateContext, Map, PublicMutable, SharedImmutable};
    use dep::aztec::keys::getters::get_historical_public_keys;
    // docs:end:imports

    // docs:start:storage_struct
    #[aztec(storage)]
    struct Storage {
        admin: PublicMutable<AztecAddress>,       // Survey creator (admin) who can publish results
        responses: Map<Field, PublicMutable<Field>>, // Stores encrypted survey responses, keyed by a hash of participant info
        survey_published: PublicMutable<bool>,    // Boolean flag to indicate if the survey has been published
        active_at_block: SharedImmutable<u32>,    // Block number when the survey was created
    }
    // docs:end:storage_struct

    // docs:start:constructor
    #[aztec(public)]
    #[aztec(initializer)] // annotation to mark function as a constructor
    fn constructor(admin: AztecAddress) {
        storage.admin.write(admin);
        storage.survey_published.write(false);
        storage.active_at_block.initialize(context.block_number() as u32);
    }
    // docs:end:constructor

    // docs:start:submit_response
    #[aztec(private)] // annotation to mark function as private
    fn submit_response(response_hash: Field) {
        // Use a nullifier to ensure each participant can only submit one response
        let header_at_active_at_block = context.get_header_at(storage.active_at_block.read_private());
        let msg_sender_npk_m_hash = get_historical_public_keys(header_at_active_at_block, context.msg_sender()).npk_m.hash();

        let secret = context.request_nsk_app(msg_sender_npk_m_hash); // Get secret key of the caller
        let nullifier = std::hash::pedersen_hash([context.msg_sender().to_field(), secret]); // Derive nullifier
        context.push_nullifier(nullifier);

        // Add the response
        Survey::at(context.this_address()).store_response(response_hash).enqueue(&mut context);
    }
    // docs:end:submit_response

    // docs:start:store_response
    #[aztec(public)]
    #[aztec(internal)] // annotation to mark function as internal
    fn store_response(response_hash: Field) {
        assert(storage.survey_published.read() == false, "Survey results are already published"); // Ensure survey is not yet published
        let existing_count = storage.responses.at(response_hash).read();
        storage.responses.at(response_hash).write(existing_count + 1);
    }
    // docs:end:store_response

    // docs:start:publish_survey
    #[aztec(public)] 
    fn publish_survey() {
        assert(storage.admin.read().eq(context.msg_sender()), "Only admin can publish the survey"); // Ensure the caller is the admin
        storage.survey_published.write(true);
    }
    // docs:end:publish_survey

    // docs:start:get_response_count
    unconstrained fn get_response_count(response_hash: Field) -> pub Field {
        storage.responses.at(response_hash).read()
    }
    // docs:end:get_response_count
}
