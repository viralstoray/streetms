package net.server.handlers.login;

import client.MapleClient;
import net.AbstractMaplePacketHandler;
import tools.MaplePacketCreator;
import tools.data.input.SeekableLittleEndianAccessor;

/**
 *
 * @author kevintjuh93
 */
public final class AcceptToSHandler extends AbstractMaplePacketHandler {

    @Override
    public boolean validateState(MapleClient c) {
        return false;
    }

    @Override
    public final void handlePacket(SeekableLittleEndianAccessor slea, MapleClient c) {
        if (slea.available() == 0 || slea.readByte() != 1 || c.acceptToS()) {
            c.disconnect();//Client dc's but just because I am cool I do this (:
            return;
        }
        c.announce(MaplePacketCreator.getAuthSuccess(c));
    }
}
