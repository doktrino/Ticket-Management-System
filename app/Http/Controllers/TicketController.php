<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreTicketRequest;
use App\Http\Requests\UpdateTicketRequest;
use App\Models\Ticket;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Inertia\Inertia;
use Inertia\Response;

class TicketController extends Controller
{
    private function options(): array
    {
        return [
            'priorities' => Ticket::PRIORITIES,
            'statuses' => Ticket::STATUSES,
            'categories' => Ticket::CATEGORIES,
        ];
    }

    public function index(Request $request): Response
    {
        $tickets = $request->user()->tickets()
            ->when($request->string('search')->toString(), fn ($q, $s) => $q->where('title', 'like', "%{$s}%"))
            ->when($request->input('status'), fn ($q, $s) => $q->where('status', $s))
            ->when($request->input('priority'), fn ($q, $p) => $q->where('priority', $p))
            ->latest()
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('Tickets/Index', [
            'tickets' => $tickets,
            'filters' => $request->only('search', 'status', 'priority'),
            'options' => $this->options(),
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('Tickets/Create', ['options' => $this->options()]);
    }

    public function store(StoreTicketRequest $request)
    {
        // user_id comes from the authenticated user relation, never from the form.
        $request->user()->tickets()->create($request->validated());

        return redirect()->route('tickets.index')->with('success', 'Ticket created.');
    }

    public function show(Ticket $ticket): Response
    {
        Gate::authorize('view', $ticket);

        return Inertia::render('Tickets/Show', ['ticket' => $ticket]);
    }

    public function edit(Ticket $ticket): Response
    {
        Gate::authorize('update', $ticket);

        return Inertia::render('Tickets/Edit', [
            'ticket' => $ticket,
            'options' => $this->options(),
        ]);
    }

    public function update(UpdateTicketRequest $request, Ticket $ticket)
    {
        $ticket->update($request->validated());

        return redirect()->route('tickets.show', $ticket)->with('success', 'Ticket updated.');
    }

    public function destroy(Ticket $ticket)
    {
        Gate::authorize('delete', $ticket);

        $ticket->delete();

        return redirect()->route('tickets.index')->with('success', 'Ticket deleted.');
    }
}
