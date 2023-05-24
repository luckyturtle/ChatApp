package com.test.chat.utils;

import java.util.Date;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtParser;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import com.test.chat.models.User;

@Component
public class JwtTokenUtil {
	static final long EXPIRE_DURATION = 24 * 60 * 60 * 1000; // 24 hour

	@Value("${app.jwt.secret}")
	private String SECRET_KEY;

	public String generateAccessToken(User user) {
		return Jwts.builder()
			.setSubject(String.format("%s,%s,%s", user.getId(), user.getUsername(), user.getName()))
			.setIssuer("TestChat")
			.setIssuedAt(new Date())
			.setExpiration(new Date(System.currentTimeMillis() + EXPIRE_DURATION))
			.signWith(SignatureAlgorithm.HS512, SECRET_KEY)
			.compact();
	}

	public Claims getClaimsFromToken(String token) {
		JwtParser parser = Jwts.parser();
		Claims claims = parser.setSigningKey(SECRET_KEY).parseClaimsJws(token).getBody();
		return claims;
	}

	public Date getExpirationDateFromToken(String token) {
		return getClaimsFromToken(token).getExpiration();
	}

	public User getProfileFromToken(String token) {
		String subject = getClaimsFromToken(token).getSubject();
		String items[] = subject.split(",");
		return new User(items[1], items[2]);
	}

	public Boolean getIsTokenExpired(String token) {
		final Date expiration = getExpirationDateFromToken(token);
		return expiration.before(new Date());
	}
}