const generateUUID = ({
  deviceId,
  nodeId,
  propertyId,
}: {
  deviceId: string;
  nodeId?: string;
  propertyId?: string;
}): string => {
  if (propertyId && nodeId) {
    return `${deviceId}/${nodeId}/${propertyId}`;
  }

  if (nodeId) {
    return `${deviceId}/${nodeId}`;
  }

  return deviceId;
};

export default generateUUID;
