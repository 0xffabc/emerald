## Magic header

Every packet starts with a magic byte: `243`

The following byte is either 4 (stands for server) or 2 (stands for client)

The 2nd, 3rd, 4th and 5th bytes specify the packet type

After that, there's a u32 preceeded by a magic byte (105); the u32 is the spawn role avatar ID, for whom the packet is intended.
