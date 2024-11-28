local folderOfThisFile = debug.getinfo(1).source:match("@?(.*/)")
local addresses = require(folderOfThisFile .. "/addressMapping")
NOVASTAR_PROTO = Proto ("novastar", "Novastar Protocol")

local f_head = ProtoField.uint16("novastar.head", "Header", base.HEX, {[0xaa55] = "Request", [0x55aa] = "Response" })
local f_ack = ProtoField.uint8("novastar.ack", "Status", base.DEC, {
  [0] = "Success",
  [1] = "Timeout Error",
  [2] = "Request CRC Error",
  [3] = "Response CRC Error",
  [4] = "Unknown Command",
  [255] = "Invalid"
})
local ef_timeout = ProtoExpert.new("novastar.timeout.expert", "Timeout Error",
    expert.group.RESPONSE_CODE,
    expert.severity.ERROR);

local ef_request = ProtoExpert.new("novastar.request.expert", "Request Error",
    expert.group.RESPONSE_CODE,
    expert.severity.ERROR);

local ef_response = ProtoExpert.new("novastar.acknowledge.expert", "Acknowledge Error",
    expert.group.RESPONSE_CODE,
    expert.severity.ERROR);

local ef_invalid = ProtoExpert.new("novastar.invalid.expert", "Invalid Command",
    expert.group.RESPONSE_CODE,
    expert.severity.ERROR);


local f_serno = ProtoField.uint8("novastar.serno", "Index", base.DEC)
local f_source = ProtoField.uint8("novastar.source", "Source", base.HEX, {[0xfe] = "Computer", [0] = "Device"})
local f_destination = ProtoField.uint8("novastar.destination", "Destination", base.HEX, {[0xfe] = "Computer", [0] = "Device"})
local f_deviceType = ProtoField.uint8("novastar.deviceType", "Device Type", base.DEC, {
  [0] = "SendingCard",
  [1] = "ReceivingCard",
  [2] = "FunctionCard"
})
local f_port = ProtoField.uint8("novastar.port", "Port", base.DEC)
local f_rcvIndex = ProtoField.uint16("novastar.rcvIndex", "Receiving Card Index", base.DEC)
local f_io = ProtoField.uint8("novastar.io", "Dir", base.DEC, { [0] = "Read", [1] = "Write" })
local f_address = ProtoField.uint32("novastar.address", "Address", base.HEX, addresses)
local f_length = ProtoField.uint16("novastar.length", "Length", base.HEX_DEC)
local f_data = ProtoField.bytes("novastar.data", "Data", base.DASH)
local f_crc = ProtoField.uint16("novastar.crc", "CRC", base.HEX)

NOVASTAR_PROTO.fields = {
    f_head,
    f_ack,
    f_serno,
    f_source,
    f_destination,
    f_deviceType,
    f_port,
    f_rcvIndex,
    f_io,
    f_address,
    f_length,
    f_data,
    f_crc,
}

NOVASTAR_PROTO.experts = { ef_timeout, ef_request, ef_response, ef_invalid }
local experts = { [1] = ef_timeout, [2] = ef_request, [3] = ef_response, [4] = ef_invalid }

function NOVASTAR_PROTO.dissector (buf, pinfo, tree)
  if buf:len() < 20 then return end
  pinfo.cols.protocol = NOVASTAR_PROTO.name
  local subtree = tree:add(NOVASTAR_PROTO, buf(0))
  local header = buf(0, 2):le_uint()
  subtree:add_le(f_head, buf(0, 2))
  if (header == 0x55aa) then
    local ack = buf(2, 1):uint()
    subtree:add(f_ack, buf(2, 1))
    if (ack > 0 and ack <= 4) then
      subtree:add_proto_expert_info(experts[ack])
    end
  end
  subtree:add(f_serno, buf(3, 1))
  subtree:add(f_source, buf(4, 1))
  subtree:add(f_destination, buf(5, 1))
  subtree:add(f_deviceType, buf(6, 1))
  subtree:add(f_port, buf(7, 1))
  subtree:add_le(f_rcvIndex, buf(8, 2))
  local io = buf(10, 1):uint()
  subtree:add(f_io, buf(10, 1))
  subtree:add_le(f_address, buf(12, 4))
  local length = buf(16, 2):le_uint()
  local offset = 18
  if length > 0 then
    subtree:add_le(f_length, buf(16, 2))
    if ((header == 0x55aa and io == 0) or (header == 0xaa55 and io == 1)) then
      subtree:add(f_data, buf(offset, length))
      offset = offset + length
    end
  end
  subtree:add_le(f_crc, buf(offset, 2))
end

local tcp_dissector_table = DissectorTable.get("tcp.port")
tcp_dissector_table:add(5200, NOVASTAR_PROTO)
tcp_dissector_table:add(5201, NOVASTAR_PROTO)
