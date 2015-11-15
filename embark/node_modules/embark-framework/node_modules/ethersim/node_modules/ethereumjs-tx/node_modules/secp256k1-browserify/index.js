const EC = require('elliptic').ec
const ec = new EC('secp256k1')
const BN = require('bn.js')

function pad32(msg) {
  var buf
  if (msg.length < 32) {
    buf = new Buffer(32)
    buf.fill(0)
    msg.copy(buf, 32 - msg.length)
    return buf
  } else
    return msg
}

function parseSig(sig) {
  var recid;
  if (sig.signature) {
    recid = sig.recovery
    sig = sig.signature
  }

  if (sig.length === 64)
    sig = {
      r: sig.slice(0, 32),
      s: sig.slice(32, 64)
    }

  return {
    sig: sig,
    recid: recid
  }
}

/**
 * Create an ECDSA signature.
 * @method sign
 * @param  {Buffer} secretkey a 32-byte secret key (assumed to be valid)
 * @param {Buffer} msg he message being signed
 */
exports.sign = function (msg, secretKey, DER, cb) {

  if (typeof DER === 'function') {
    cb = DER
    DER = false
  }

  var result = ec.sign(new BN(msg), new BN(secretKey))

  if (DER)
    result = new Buffer(result.toDER())
  else {
    result = {
      signature: new Buffer(result.r.toArray().concat(result.s.toArray())),
      recovery: result.recoveryParam
    }
  }

  if (cb)
    cb(null, result)
  else
    return result
}

/**
 * Verify an ECDSA signature.
 * @method verify
 * @param {Buffer} mgs the message
 * @param {Buffer|Object} sig the signature
 * @param {Buffer} pubKey the public key
 * @return {Integer}
 *
 *    - 1: correct signature
 *    - 0: incorrect signature
 */
exports.verify = function (msg, sig, pubKey, cb) {

  sig = parseSig(sig)
  var key = ec.keyFromPublic(pubKey)
  var result

  try {
    result = ec.verify(new BN(msg), sig.sig, key)
  } catch (e) {
    result = false
  }
  if (cb)
    cb(result)
  else
    return result
}

/**
 * Recover an ECDSA public key from a compact signature. In the process also verifing it.
 * @method recoverCompact
 * @param {Buffer} msg the message assumed to be signed
 * @param {Buffer} sig the signature as 64 byte buffer
 * @param {Integer} recid the recovery id (as returned by ecdsa_sign_compact)
 * @param {Boolean} compressed whether to recover a compressed or uncompressed pubkey
 * @param {Function} [cb]
 * @return {Buffer} the pubkey, a 33 or 65 byte buffer
 */
exports.recover = function (msg, sig, compressed, cb) {

  if (typeof compressed === 'function') {
    cb = compressed
    compressed = true
  }

  if (compressed === undefined) {
    compressed = true
  }

  sig = parseSig(sig)
  var r = ec.recoverPubKey(new BN(msg), sig.sig, sig.recid, 'hex')

  if (compressed)
    r = r.encodeCompressed()
  else
    r = r.encode()

  r = new Buffer(r)

  if (cb)
    cb(null, r)
  else
    return r
}

/**
 * Compute the public key from a secret key.
 * @method createPubKey
 * @param {Buffer} secKey a 32-byte private key.
 * @param {Boolean} [compressed=0] whether the computed public key should be compressed
 * @return {Buffer} a 33-byte (if compressed) or 65-byte (if uncompressed) area to store the public key.
 */
exports.createPublicKey = function (secKey, compressed) {
  if (!secKey)
    throw new Error('invalid private key')

  const key = ec.keyFromPrivate(secKey)
  const pub = key.getPublic()

  if (compressed === undefined) {
    compressed = true
  }

  if (compressed)
    return new Buffer(pub.encodeCompressed())
  else
    return new Buffer(pub.encode())
}
