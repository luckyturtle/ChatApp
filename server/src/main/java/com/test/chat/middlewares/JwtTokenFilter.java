package com.test.chat.middlewares;

import java.io.IOException;
import java.util.Collections;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import org.springframework.http.HttpHeaders;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import com.test.chat.utils.JwtTokenUtil;
import com.test.chat.models.User;

@Component
public class JwtTokenFilter extends OncePerRequestFilter {

	private final JwtTokenUtil jwtTokenUtil;

	public JwtTokenFilter(JwtTokenUtil jwtTokenUtil) {
		this.jwtTokenUtil = jwtTokenUtil;
	}

	@Override
	protected void doFilterInternal(
		HttpServletRequest request,
		HttpServletResponse response,
		FilterChain chain
	) throws ServletException, IOException {
		final String header = request.getHeader(HttpHeaders.AUTHORIZATION);
		if (StringUtils.isEmpty(header) || !header.startsWith("Bearer ")) {
			chain.doFilter(request, response);
			return;
		}

		final String token = header.split(" ")[1].trim();
		if (jwtTokenUtil.getIsTokenExpired(token)) {
			chain.doFilter(request, response);
			return;
		}

		User user = jwtTokenUtil.getProfileFromToken(token);

		UsernamePasswordAuthenticationToken authToken =
			new UsernamePasswordAuthenticationToken(user.getUsername(), "", Collections.emptyList());

		request.setAttribute("profile", user);

		SecurityContextHolder.getContext().setAuthentication(authToken);
		chain.doFilter(request, response);
	}

}
