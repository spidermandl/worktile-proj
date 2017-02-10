package com.sjtu.worktile.helper;

import com.sjtu.worktile.configuration.Const;
import io.jsonwebtoken.*;

import javax.crypto.spec.SecretKeySpec;
import javax.xml.bind.DatatypeConverter;
import java.security.Key;
import java.util.Date;
import java.util.List;

/**
 * Created by Desmond on 01/01/2017.
 */
public class JwtHelper {
    /**
     * 解析token
     * @param jsonWebToken
     * @param base64Security
     * @return
     */
    public static Claims parseJWT(String jsonWebToken, String base64Security) throws JwtException {
        Claims claims = Jwts.parser()
                .setSigningKey(DatatypeConverter.parseBase64Binary(base64Security))
                .parseClaimsJws(jsonWebToken).getBody();
        return claims;
    }

    /**
     * 生成token
     * @param name
     * @param userId
     * @param roles
     * @param audience
     * @param issuer
     * @param TTLMillis
     * @param base64Security
     * @return
     */
    public static String createJWT(String name, int userId, List<String> roles,
                                   String audience, String issuer, long TTLMillis, String base64Security)
    {
        SignatureAlgorithm signatureAlgorithm = SignatureAlgorithm.HS256;

        long nowMillis = System.currentTimeMillis();
        Date now = new Date(nowMillis);

        //生成签名密钥
        byte[] apiKeySecretBytes = DatatypeConverter.parseBase64Binary(base64Security);
        Key signingKey = new SecretKeySpec(apiKeySecretBytes, signatureAlgorithm.getJcaName());

        //添加构成JWT的参数
        JwtBuilder builder = Jwts.builder().setHeaderParam("type", "JWT")
                .claim("roles", roles)
                .claim("unique_name", name)
                .claim(Const.TOKEN_UID, userId)
                .setIssuer(issuer)
                .setAudience(audience)
                .signWith(signatureAlgorithm, signingKey);
        //添加Token过期时间
        if (TTLMillis >= 0) {
            long expMillis = nowMillis + TTLMillis;
            Date exp = new Date(expMillis);
            builder.setExpiration(exp).setNotBefore(now);
        }

        //生成JWT
        return builder.compact();
    }
}
