# 🚀 VPS Setup Guide for Ahmet Dogan's Portfolio

## **Total Cost: $12/month for all 4 sites**

---

## **Step 1: Create DigitalOcean Account**

1. Go to [DigitalOcean.com](https://digitalocean.com)
2. Sign up with GitHub or email
3. Add payment method

---

## **Step 2: Create Droplet**

### **Droplet Settings:**
- **Image**: Ubuntu 22.04 LTS
- **Plan**: Basic
- **Size**: $12/month (2GB RAM, 50GB SSD) - **Recommended for 4 sites**
- **Datacenter**: Choose closest to your visitors
- **Authentication**: SSH key (recommended) or password
- **Hostname**: `doganahmet-vps`

### **After Creation:**
- Note your server IP address
- You'll receive an email with root password

---

## **Step 3: Connect to Your Server**

```bash
# SSH into your server
ssh root@YOUR_SERVER_IP

# Or if using password
ssh root@YOUR_SERVER_IP
# Enter the password from email
```

---

## **Step 4: Run Setup Script**

```bash
# Download and run the setup script
curl -o setup-vps.sh https://raw.githubusercontent.com/your-repo/setup-vps.sh
chmod +x setup-vps.sh
./setup-vps.sh
```

**This will install:**
- ✅ Nginx web server
- ✅ Node.js 18.x
- ✅ PM2 process manager
- ✅ SSL certificates (Certbot)
- ✅ Firewall configuration
- ✅ Directory structure for 4 sites

---

## **Step 5: Point Your Domain**

1. Go to your domain registrar (where you bought doganahmet.com)
2. Update DNS settings:
   - **A Record**: `@` → `YOUR_SERVER_IP`
   - **A Record**: `www` → `YOUR_SERVER_IP`
3. Wait 24-48 hours for DNS propagation

---

## **Step 6: Deploy Your Portfolio**

```bash
# On your local machine
chmod +x deploy-site.sh
./deploy-site.sh

# Follow the instructions to upload files
scp portfolio-deploy.tar.gz root@YOUR_SERVER_IP:/tmp/

# SSH into server and run deployment commands
ssh root@YOUR_SERVER_IP
```

---

## **Step 7: Set Up SSL (Free)**

```bash
# On your server
sudo certbot --nginx -d doganahmet.com -d www.doganahmet.com
```

---

## **Step 8: Verify Everything Works**

- Visit: `https://doganahmet.com`
- Visit: `https://www.doganahmet.com`
- Check API: `https://doganahmet.com/api/health`

---

## **Step 9: Prepare for Other 3 Sites**

Your server is now ready for all 4 sites:
- `/var/www/doganahmet.com` - Main portfolio ✅
- `/var/www/site2.doganahmet.com` - Site 2
- `/var/www/site3.doganahmet.com` - Site 3  
- `/var/www/site4.doganahmet.com` - Site 4

---

## **💰 Cost Breakdown**

- **DigitalOcean Droplet**: $12/month
- **Domain**: Already owned
- **SSL Certificates**: Free (Let's Encrypt)
- **Total**: $12/month for all 4 sites

---

## **🔧 Management Commands**

```bash
# Check server status
pm2 status
sudo systemctl status nginx

# View logs
pm2 logs portfolio
sudo tail -f /var/log/nginx/access.log

# Restart services
pm2 restart portfolio
sudo systemctl restart nginx

# Update SSL certificates
sudo certbot renew
```

---

## **📞 Support**

If you need help:
1. Check DigitalOcean documentation
2. Check server logs
3. Contact me for assistance

---

**🎉 Congratulations! Your VPS is ready for all 4 sites!**
