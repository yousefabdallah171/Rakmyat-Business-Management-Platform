<?php

namespace App\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class MessageSent implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public $tenantId;
    public $message;
    public $senderId;
    public $receiverId;
    public $fileUrl;

    /**
     * Create a new event instance.
     */
    public function __construct($tenantId, $message, $senderId, $receiverId = null, $fileUrl = null)
    {
        $this->tenantId = $tenantId;
        $this->message = $message;
        $this->senderId = $senderId;
        $this->receiverId = $receiverId;
        $this->fileUrl = $fileUrl;
    }

    /**
     * Get the channels the event should broadcast on.
     *
     * @return \Illuminate\Broadcasting\Channel
     */
    public function broadcastOn()
    {
        return new PrivateChannel('tenant.' . $this->tenantId);
    }

    public function broadcastWith()
    {
        return [
            'tenant_id' => $this->tenantId,
            'message' => $this->message,
            'sender_id' => $this->senderId,
            'receiver_id' => $this->receiverId,
            'file_url' => $this->fileUrl,
        ];
    }
}
