<?php

namespace App\Http\Requests;

class UpdateTicketRequest extends StoreTicketRequest
{
    public function authorize(): bool
    {
        // Goes through TicketPolicy@update. Non-owner gets 403 before validation runs.
        return $this->user()->can('update', $this->route('ticket'));
    }
}
